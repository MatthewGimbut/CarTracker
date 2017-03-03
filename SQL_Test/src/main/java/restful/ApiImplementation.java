package restful;

import models.User;
import models.Vehicle;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.util.List;

/**
 * Copyright Dr. Ganesh R. Baliga
 * All rights reserved.
 * Modified by Michael Moscariello on 2/28/17
 */
public class ApiImplementation extends Api {

    Sql2o sql2o;
    static final String DB_URL = "jdbc:mysql://mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com/CarTrackerInfo";
    static final String DB_USERNAME = "MikeDB";
    static final String DB_PASSWORD = "moscariello";

    public ApiImplementation() {
        sql2o = new Sql2o(DB_URL, DB_USERNAME, DB_PASSWORD);
    }


    @Override
    public List<User> getUser(String username){
        List<User> user = null;
        try (Connection conn = sql2o.open()) {
            user = conn.createQuery("select * from users where "
                    + "users.username=:username;")
                    .addParameter("username", username)
                    .executeAndFetch(User.class);
            return user;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = null;
        try (Connection conn = sql2o.open()) {
            users = conn.createQuery("select * from users")
                            .executeAndFetch(User.class);
            return users;
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return users;
    }

    @Override
    public List<Vehicle> getUserCars(String username)
    {
        List<Vehicle> vehicles = null;

        try (Connection conn = sql2o.open()) {
            List<String> ID =
                    conn.createQuery("select userID from users where users.username=:username")
                            .addParameter("username", username)
                            .executeAndFetch(String.class);
            if(ID.size() != 1) {
                return null;
            }
            int userID = Integer.parseInt(ID.get(0));
            vehicles = conn.createQuery("select * from cars where cars.userID=:userID")
                            .addParameter("userID", userID)
                            .executeAndFetch(Vehicle.class);
            return vehicles;
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return vehicles;
    }

    @Override
    public boolean createUser (
            String firstName,
            String lastName,
            String username,
            String password,
            String email,
            int age,
            String DOB
    ) {
        try (Connection conn = sql2o.open()) {
            conn.createQuery("insert into users (firstName, lastName, username, password, email, age, DOB) "
                    + "values (:firstName, :lastName, :username, :password, :email, :age, :DOB);")
                    .addParameter("firstName", firstName)
                    .addParameter("lastName", lastName)
                    .addParameter("username", username)
                    .addParameter("password", password)
                    .addParameter("email", email)
                    .addParameter("age", age)
                    .addParameter("DOB", DOB)
                    .executeUpdate();
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean createVehicle(
            String username,
            String make,
            String model,
            int year,
            String trim,
            int mileage
    ){
        try (Connection conn = sql2o.open()) {
            List<String> ID =
                    conn.createQuery("select userID from users where username=:username")
                        .addParameter("username", username)
                        .executeAndFetch(String.class);
            if(ID.size() != 1) {
                return false;
            }
            else {
                int userID = Integer.parseInt(ID.get(0));
                conn.createQuery("insert into cars (userID, make, model, year, trim, mileage)"
                    + "values (:userID, :make, :model, :year, :trim, :mileage);")
                    .addParameter("userID", userID)
                    .addParameter("make", make)
                    .addParameter("model", model)
                    .addParameter("year", year)
                    .addParameter("trim", trim)
                    .addParameter("mileage", mileage)
                    .executeUpdate();
                return true;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateMileage(int carID, int mileage){
                try (Connection conn = sql2o.open()) {
                    conn.createQuery("UPDATE cars SET mileage=:mileage WHERE carID=:carID")
                         .addParameter("carID", carID)
                         .addParameter("mileage", mileage)
                         .executeUpdate();
                    return true;
                }
                catch(Exception e) {
                    e.printStackTrace();
                    return false;
                }
    }
}
