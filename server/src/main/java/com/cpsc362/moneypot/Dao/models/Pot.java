package com.cpsc362.moneypot.Dao.models;


import com.cpsc362.moneypot.Models.Participant;
import com.mongodb.DBObject;
import lombok.NonNull;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import java.util.ArrayList;


public class Pot {

    private ObjectId id;

    @BsonProperty(value = "pot_name")
    private String potName;

    @BsonProperty(value = "pot_organizer")
    private String potOrganizer;

    @BsonProperty(value = "contribution_amount")
    private Integer contributionAmount;

    @BsonProperty(value = "total_pot_amount")
    private Integer totalPotAmount;

    @BsonProperty(value = "participants")
    private ArrayList<Participant> participantArrayList;

//    @BsonProperty(value = "participants")
//    private ArrayList<DBObject> participantArrayList1;

    public Pot() {
    }
    public ArrayList<Participant> getParticipantArrayList(){
        return participantArrayList;
    }
//    public ArrayList<DBObject> getParticipantArrayList1(){
//        return participantArrayList1;
//    }

//    public Pot setParticipantArrayList1(ArrayList<DBObject> participantArrayList1){
//        this.participantArrayList1 = participantArrayList1;
//        return this;
//    }

    public Pot setParticipantArrayList(ArrayList<Participant> participantArrayList){
        this.participantArrayList = participantArrayList;
        return this;
    }

    public ObjectId getId() {
        return id;
    }

    public Pot setId(ObjectId id) {
        this.id = id;
        return this;
    }

    public String getPotName() {
        return potName;
    }

    public Pot setPotName(String potName){
        this.potName = potName;
        return this;
    }

    public String getPotOrganizer(){
        return potOrganizer;
    }

    public Pot setPotOrganizer(String potOrganizer){
        this.potOrganizer = potOrganizer;
        return this;
    }

    public Integer getContributionAmount(){
        return contributionAmount;
    }

    public Pot setContributionAmount(Integer contributionAmount){
        this.contributionAmount = contributionAmount;
        return this;
    }

    public Integer getTotalPotAmount(){
        return totalPotAmount;
    }

    public Pot setTotalPotAmount(Integer totalPotAmount){
        this.totalPotAmount = totalPotAmount;
        return this;
    }

}
