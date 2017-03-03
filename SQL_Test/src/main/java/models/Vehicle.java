package models;

/**
 * Created by Mike on 3/1/2017.
 */
public class Vehicle
{
    private int carID;
    private int userID;
    private String make;
    private String model;
    private int year;
    private String trim;
    private int mileage;

    public Vehicle(int carID, int userID, String make, String model, int year, String trim, int mileage)
    {
        this.carID = carID;
        this.userID = userID;
        this.make = make;
        this.model = model;
        this.year = year;
        this.trim = trim;
        this.mileage = mileage;
    }

    public Vehicle(int userID, String make, String model, int year, String trim, int mileage){
        this.userID = userID;
        this.make = make;
        this.model = model;
        this.year = year;
        this.trim = trim;
        this.mileage = mileage;
    }

    public int getCarID()
    {
        return carID;
    }

    public void setCarID(int carID)
    {
        this.carID = carID;
    }

    public int getUserID()
    {
        return userID;
    }

    public void setUserID(int userID)
    {
        this.userID = userID;
    }

    public String getMake()
    {
        return make;
    }

    public void setMake(String make)
    {
        this.make = make;
    }

    public String getModel()
    {
        return model;
    }

    public void setModel(String model)
    {
        this.model = model;
    }

    public int getYear()
    {
        return year;
    }

    public void setYear(int year)
    {
        this.year = year;
    }

    public String getTrim()
    {
        return trim;
    }

    public void setTrim(String trim)
    {
        this.trim = trim;
    }

    public int getMileage()
    {
        return mileage;
    }

    public void setMileage(int mileage)
    {
        this.mileage = mileage;
    }
}