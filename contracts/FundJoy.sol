// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FundJoy {
    //} is ERC721 {
    address public owner;
    uint public totalFund;

    enum EventStatus {
        Pending,
        Executed
    }

    struct Donor {
        string donorName;
        uint donatedAmount;
    }

    struct FundraisingEvent {
        string eventName;
        uint requiredFund;
        EventStatus status;
    }

    struct Transaction {
        uint amount;
        address toAddress;
        address fromAddress;
    }

    mapping(address => Donor) public donors;
    mapping(address => string) public suggestions;

    FundraisingEvent[] public events;
    Transaction[] public transactions;

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner can call this function');
        _;
    }

    modifier validDeposit(uint _amount) {
        require(_amount > 0, 'Deposit amount must be greater than 0');
        _;
    }

    modifier validDonor(string memory _donorName) {
        require(bytes(_donorName).length > 0, 'Donor name cannot be empty.');
        _;
    }

    modifier validWithdrawal(uint _amount) {
        require(
            totalFund >= _amount && _amount > 0,
            'Invalid withdrawal amount'
        );
        _;
    }

    modifier validEvent(string memory _eventName, uint _requiredFund) {
        require(bytes(_eventName).length > 0, "Event name can't be null");
        require(_requiredFund > 0, 'Required funds must be greater than 0');
        _;
    }

    modifier validEvents() {
        require(events.length > 0, 'No events to be executed. Plan something!');
        _;
    }

    constructor() {
        //ERC721("FundJoyToken", "FJT") {
        owner = payable(msg.sender);
    }

    function donateFund(
        string memory _donorName,
        string memory _suggestion
    ) public payable validDonor(_donorName) validDeposit(msg.value) {
        (bool success, ) = owner.call{value: msg.value}('');
        require(success, 'Transaction failed! Please try again.');
        totalFund += msg.value;

        if (donors[msg.sender].donatedAmount > 0) {
            donors[msg.sender].donatedAmount += msg.value;
        } else {
            donors[msg.sender] = Donor(_donorName, msg.value);
        }

        if (bytes(_suggestion).length > 0) {
            suggestions[msg.sender] = _suggestion;
        }

        recordTransaction(msg.value, msg.sender);
    }

    function withdrawFund(
        uint _amount
    ) public payable onlyOwner validWithdrawal(_amount) {
        payable(owner).transfer(_amount);
        totalFund -= _amount;
        recordTransaction(_amount, owner);
    }

    function postEvent(
        string memory _eventName,
        uint _requiredFund
    ) public onlyOwner validEvent(_eventName, _requiredFund) {
        events.push(
            FundraisingEvent(_eventName, _requiredFund, EventStatus.Pending)
        );
    }

    function executeEvents() public onlyOwner validEvents {
        for (uint i = 0; i < events.length; i++) {
            if (
                events[i].requiredFund <= totalFund &&
                events[i].status == EventStatus.Pending
            ) {
                withdrawFund(events[i].requiredFund);
                events[i].status = EventStatus.Executed;
            }
        }
    }

    function recordTransaction(uint _amount, address _toAddress) internal {
        transactions.push(Transaction(_amount, _toAddress, msg.sender));
    }

    receive() external payable {
        if (msg.sender != owner) {
            donateFund('Anonymous', '');
        }
    }

    fallback() external payable {
        revert('Fallback function not allowed');
    }
}
