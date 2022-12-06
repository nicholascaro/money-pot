package com.cpsc362.moneypot.Models;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.AllArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonProperty;
import lombok.NonNull;

import javax.servlet.http.Part;
import java.util.Date;

@AllArgsConstructor
public class Participant {

    @BsonProperty(value = "index")
    private String index;

    @BsonProperty(value = "name")
    private String name;

    @BsonProperty(value = "position")
    private Integer position;

    @BsonProperty(value = "date")
    private String date;


    public Participant(){

    }

    public String getIndex() {return index;}

    public Participant setIndex(String index){
        this.index = index;
        return this;
    }
    public String getName(){
        return name;
    }

    public Participant setName(String name){
        this.name = name;
        return this;
    }

    public Integer getPosition(){
        return position;
    }

    public Participant setPosition(Integer position){
        this.position = position;
        return this;
    }

    public String getDate(){
        return date;
    }

    public Participant setDate(String date){
        this.date = date;
        return this;
    }
}
