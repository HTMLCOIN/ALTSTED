pragma solidity ^0.4.21;

///@title myoffspring
///@author andersonassis83 - adeassis@htmlcoin.team

contract myoffspring{
    
    address owner;
    
    struct Heir{
        bool stored;
        address sender;
        string heirFullName;
        uint dateOfBirth;
        uint timeOfBirth;
        string place;
        string motherFullName;
        string fatherFullName;

    }

    mapping(string => Heir) internal documents;

    event DocumentEvent(string hash);
    
    constructor() public{
        owner = msg.sender;
    }
    
     ///@dev Defines the main wallets for the application to work
    
    function empty() public{
        owner.transfer(address(this).balance);
    }
    
    ///@dev Defines the main wallets for the application to work
    ///@param hash
    ///@param heirFullName:
    ///@param dateOfBirth:
    ///@param timeOfBirth:
    ///@param place:
    ///@param motherFullName:
    ///@param fatherFullName:
    
    function addDocument(string hash, string heirFullName, uint dateOfBirth, uint timeOfBirth,
                         string place, string motherFullName, string fatherFullName) internal{
                             
        documents[hash].stored = true;
        documents[hash].sender = msg.sender;
        documents[hash].dateOfBirth = dateOfBirth;
        documents[hash].timeOfBirth = timeOfBirth;
        documents[hash].heirFullName = heirFullName;
        documents[hash].place = place;
        documents[hash].motherFullName = motherFullName;
        documents[hash].fatherFullName = fatherFullName;
       
    }
    
    
    ///@dev Defines the main wallets for the application to work
    ///@param hash
    ///@param heirFullName:
    ///@param dateOfBirth:
    ///@param timeOfBirth:
    ///@param place:
    ///@param motherFullName:
    ///@param fatherFullName:
    
    function newDocument(string hash, string heirFullName, uint dateOfBirth, uint timeOfBirth, string place, string motherFullName, 
                         string fatherFullName) external returns(bool success){

        if(documents[hash].stored){

            success = false;

        } else {

            addDocument(hash, heirFullName, dateOfBirth, timeOfBirth, place, motherFullName,fatherFullName);
                        
            emit DocumentEvent(hash);
            
            success = true;

        }
        
        return success;
    }
    
    ///@dev Defines the main wallets for the application to work
    ///@param sender
    ///@param heirFullName:
    ///@param dateOfBirth:
    ///@param timeOfBirth:
    ///@param place:
    ///@param motherFullName:
    ///@param fatherFullName:
       
    function getDocument(string hash) external view returns(address sender, string heirFullName, uint dateOfBirth, uint timeOfBirth,
                                                                  string place, string motherFullName, string fatherFullName){

        require(documents[hash].stored);
        
        return(documents[hash].sender, documents[hash].dateOfBirth, documents[hash].timeOfBirth,
               documents[hash].heirFullName, documents[hash].place, documents[hash].motherFullName,
               documents[hash].fatherFullName);

    }
    
    
    


}