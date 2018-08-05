pragma solidity ^0.4.24;

///@title myoffspring
///@author andersonassis83 - adeassis@htmlcoin.team

contract myoffspring{
    
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

    mapping(string => Heir) internal heirs;

    event heirEvent(string hash);
    
    ///@dev Adds a new record to the blockchain containing all Heir's birth attributes. To be used internally only.
    ///@param hash An unique hash based on all Heir attributes. Should be encrypted externally.
    ///@param heirFullName The full name of the Heir.
    ///@param motherFullName Heir's mother full name.
    ///@param fatherFullName Heir's father full name.
    ///@param dateOfBirth Heir's date of birth in the format YYYYMMDD
    ///@param timeOfBirth Heir's time of birth in the format HH24mmss
    ///@param placeOfBirth Heir's place of birth. Preferrable format: City, State, Country
    
    function addHeir(string hash, 
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
        
        heirs[hash].stored = true;
        heirs[hash].sender = msg.sender;
        heirs[hash].heirFullName = heirFullName;
        heirs[hash].motherFullName = motherFullName;
        heirs[hash].fatherFullName = fatherFullName;
        heirs[hash].dateOfBirth = dateOfBirth;
        heirs[hash].timeOfBirth = timeOfBirth;
        heirs[hash].placeOfBirth = placeOfBirth;    
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
    
    function newHeir(string hash, 
                     string heirFullName,
                     string motherFullName, 
                     string fatherFullName,
                     uint dateOfBirth, 
                     uint timeOfBirth, 
                     string placeOfBirth) 
    external 
    returns(string result){
    
        if(heirs[hash].stored){

            result = "Hash is already registered.";

        } else {

            addHeir(hash, heirFullName, motherFullName, fatherFullName, dateOfBirth, timeOfBirth, placeOfBirth);
                        
            emit heirEvent(hash);
            
            result = "Heir registered successfully";

        }
        
        return result;
    }
    
    ///@dev Displays Heir data based on their unique hash.
    ///@param hash An unique hash based on all Heir attributes. Should be encrypted externally.
       
    function getHeir(string hash)
    external 
    view 
    returns(string result,
            string heirFullName, 
            string motherFullName, 
            string fatherFullName, 
            uint dateOfBirth, 
            uint timeOfBirth, 
            string placeOfBirth){

        if(heirs[hash].stored){
            result = "Heir record found.";
        }else{
            result = "Heir not found.";
        }
        
        return(result,
               heirs[hash].heirFullName,
               heirs[hash].motherFullName, 
               heirs[hash].fatherFullName,
               heirs[hash].dateOfBirth, 
               heirs[hash].timeOfBirth, 
               heirs[hash].placeOfBirth);

    }
    
    ///@dev Throw if any coin is received
    
    function() public payable {
        revert();
    }
    
}
