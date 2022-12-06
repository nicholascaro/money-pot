package com.cpsc362.moneypot.Service;

import com.cpsc362.moneypot.Dao.DatabaseConnection;
import com.cpsc362.moneypot.Dao.models.Pot;

import java.util.Map;


public class MoneyPot {
    DatabaseConnection databaseConnection = new DatabaseConnection();

    public String deleteMoneyPot(Map<String, Object> requestParam){
        String id = requestParam.get("_id").toString();
        if (databaseConnection.deletePot(id)){
            return "Money Pot " + id + " has been deleted.";
        } else { return "Money Pot " + id + " could not be found."; }
    }

    public String addMoneyPot(Map<String, Object> requestParam){
        if (databaseConnection.insertOne(requestParam)){
            Pot retrievedPot = databaseConnection.findOneWithName(requestParam.get("pot_name").toString());
            String id = retrievedPot.getId().toString();
            return "Money Pot with name " + requestParam.get("pot_name").toString() + " has the following id: " + id;
        } else {
            return "Error adding Pot to database.Try Again.";
        }
    }

    public Pot findMoneyPot(String id){
//        String id = requestParam.get("_id").toString();
        Pot retrievedPot = databaseConnection.findOneWithId(id);
        return retrievedPot;
    }

}
