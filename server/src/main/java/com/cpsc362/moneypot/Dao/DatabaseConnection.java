package com.cpsc362.moneypot.Dao;

import com.cpsc362.moneypot.Dao.models.Pot;
import com.cpsc362.moneypot.Models.Participant;
import com.mongodb.*;
import com.mongodb.client.*;
import com.mongodb.client.result.DeleteResult;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;


import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.*;

import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;


public class DatabaseConnection {
    CodecRegistry pojoCodecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
            fromProviders(PojoCodecProvider.builder().automatic(true).build()));
    CodecRegistry codecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
            pojoCodecRegistry);
    ConnectionString connectionString = new
    ConnectionString("mongodb+srv://money-pot-user:lsW90ZLz8NWLKpjt@cluster0.dm3qvxd.mongodb.net/?retryWrites=true&w=majority");

    MongoClientSettings clientSettings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .codecRegistry(codecRegistry)
            .build();

    MongoClient MongoClient = MongoClients.create(clientSettings);

    MongoDatabase Db = MongoClient.getDatabase("CPSC362");

    MongoCollection<Pot> moneyPotsCollection = Db.getCollection("MONEYPOTS", Pot.class);
    MongoCollection<Document> deleteCollection = Db.getCollection("MONEYPOTS");


    //TODO write database operations below

    //TODO change input to pot_name for deletePot
    public Boolean deletePot (String name){
        System.out.println(name);
        Bson queryId = eq("_id", new ObjectId(name));
        DeleteResult result = moneyPotsCollection.deleteOne(queryId);
        System.out.println("Deleted document count: " + result.getDeletedCount());
        return result.getDeletedCount() == 1;
    }

    public static List<?> convertObjectToList(Object obj) {
        List<?> list = new ArrayList<>();
        if (obj.getClass().isArray()) {
            list = Arrays.asList((Object[])obj);
        } else if (obj instanceof Collection) {
            list = new ArrayList<>((Collection<?>)obj);
        }
        return list;
    }

    public Boolean insertOne(Map<String, Object> newPotModel) {
        Pot newPot = new Pot();
        newPot.setPotName(newPotModel.get("pot_name").toString());
        newPot.setPotOrganizer(newPotModel.get("pot_organizer").toString());
        newPot.setContributionAmount(Integer.valueOf(newPotModel.get("contribution_amount").toString()));
        newPot.setTotalPotAmount(Integer.valueOf(newPotModel.get("total_pot_amount").toString()));
        ArrayList<Participant> participantArrayList= new ArrayList<>();
        for (Object i: convertObjectToList(newPotModel.get("participants"))){
            Participant participant = new Participant();
            Map<String, Object> entry = (Map<String, Object>) i;
            participant.setIndex(entry.get("index").toString());
            participant.setName(entry.get("name").toString());
            participant.setPosition(Integer.valueOf(entry.get("position").toString()));
            participant.setDate((entry.get("date").toString()));
            participantArrayList.add(participant);
        }
        newPot.setParticipantArrayList(participantArrayList);
        System.out.println(newPot);
        try {
            moneyPotsCollection.insertOne(newPot);
            return true;
        } catch (MongoException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public Pot findOneWithId(String id){
        Bson queryId = eq("_id", new ObjectId(id));
        try {
            Pot pot;
            pot = moneyPotsCollection.find(queryId)
                    .first();
            return pot;
        } 
        catch (MongoException mongoException){
            System.out.println(mongoException.getMessage());
            return null;
        }
    }


    public Pot findOneWithName(String potName){
        try {
            Pot pot;
            pot = moneyPotsCollection.find(eq("pot_name", potName))
                .first();
            return pot;
        } 
        catch (MongoException mongoException){
            System.out.println(mongoException.getMessage());
            return null;
        }
    }


}
