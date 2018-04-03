package org.mhenro.apporganizer.model.entity;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class Address implements Serializable {
    private String street;
    private Integer houseNumber;
    private String postalCode;
    private String locality;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(Integer houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }
}
