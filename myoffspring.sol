pragma solidity ^0.4.24;

///@title myoffspring
///@author andersonassis83 - adeassis@htmlcoin.team

contract myoffspring{

    address owner;
    
    struct Heir{
        bool stored;
        address sender;
        string heirFullName;
        string motherFullName;
        string fatherFullName;
        uint dateOfBirth;
        uint timeOfBirth;
        string placeOfBirth;
    }

    mapping(string => Heir) internal documents;

    event DocumentEvent(string hash);
    
    constructor() 
    public{
        owner = msg.sender;
    }
    
    ///@dev Handles any funds sent to the contract by mistake
    
    function empty() 
    public{
        owner.transfer(address(this).balance);
    }
    
    ///@dev Adds a new "document" to the blockchain containing all Heir's birth attributes. To be used internally only.
    ///@param hash An unique hash based on all Heir attributes. Should be encrypted externally.
    ///@param heirFullName The full name of the Heir.
    ///@param motherFullName Heir's mother full name.
    ///@param fatherFullName Heir's father full name.
    ///@param dateOfBirth Heir's date of birth in the format YYYYMMDD
    ///@param timeOfBirth Heir's time of birth in the format HH24mmss
    ///@param placeOfBirth Heir's place of birth. Preferrable format: City, State, Country
    
    function addDocument(string hash, 
                         string heirFullName, 
                         string motherFullName, 
                         string fatherFullName, 
                         uint dateOfBirth, 
                         uint timeOfBirth, 
                         string placeOfBirth) 
    internal{
        
        require(bytes(hash).length > 0);
        require(bytes(heirFullName).length > 0);
        require(dateOfBirth > 0);
        
        documents[hash].stored = true;
        documents[hash].sender = msg.sender;
        documents[hash].heirFullName = heirFullName;
        documents[hash].motherFullName = motherFullName;
        documents[hash].fatherFullName = fatherFullName;
        documents[hash].dateOfBirth = dateOfBirth;
        documents[hash].timeOfBirth = timeOfBirth;
        documents[hash].placeOfBirth = placeOfBirth;    
    }
    
    ///@dev Checks if that Heir has already been added to the blockchain. 
    //      If not, calls the addDocument function.
    ///@param hash An unique hash based on all Heir attributes. Should be encrypted externally.
    ///@param heirFullName The full name of the Heir.
    ///@param motherFullName Heir's mother full name.
    ///@param fatherFullName Heir's father full name.
    ///@param dateOfBirth Heir's date of birth in the format YYYYMMDD
    ///@param timeOfBirth Heir's time of birth in the format HH24mmss
    ///@param placeOfBirth Heir's place of birth. Preferrable format: City, State, Country
    
    function newDocument(string hash, 
                         string heirFullName,
                         string motherFullName, 
                         string fatherFullName,
                         uint dateOfBirth, 
                         uint timeOfBirth, 
                         string placeOfBirth) 
    external 
    returns(string result){
    
        if(documents[hash].stored){

            result = "Hash is already registered.";

        } else {

            addDocument(hash, heirFullName, motherFullName, fatherFullName, dateOfBirth, timeOfBirth, placeOfBirth);
                        
            emit DocumentEvent(hash);
            
            result = "Heir registered successfully";

        }
        
        return result;
    }
    
    ///@dev Displays Heir data based on their unique hash.
    ///@param hash An unique hash based on all Heir attributes. Should be encrypted externally.
       
    function getDocument(string hash)
    external 
    view 
    returns(string result,
            string heirFullName, 
            string motherFullName, 
            string fatherFullName, 
            uint dateOfBirth, 
            uint timeOfBirth, 
            string placeOfBirth){

        if(documents[hash].stored){
            result = "Heir record found.";
        }else{
            result = "Heir not found.";
        }
        
        return(result,
               documents[hash].heirFullName,
               documents[hash].motherFullName, 
               documents[hash].fatherFullName,
               documents[hash].dateOfBirth, 
               documents[hash].timeOfBirth, 
               documents[hash].placeOfBirth);

    }
    
}
