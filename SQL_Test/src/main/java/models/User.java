package models;

/**
 * Created by Mike on 2/15/2017.
 */
public class User
{
    private int userID;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private int age;
    private String DOB;

    public User(int userID, String firstName, String lastName, String username, String password, String email, int age, String DOB)
    {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.DOB = DOB;
    }

    public User(String firstName, String lastName, String username, String password, String email, int age, String DOB)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.DOB = DOB;
    }

    public User(){

    }

    public int getUserID() { return userID; }

    public void setUserID(int userID) { this.userID = userID; }

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public int getAge()
    {
        return age;
    }

    public void setAge(int age)
    {
        this.age = age;
    }

    public String getDOB()
    {
        return DOB;
    }

    public void setDOB(String DOB)
    {
        this.DOB = DOB;
    }
}
