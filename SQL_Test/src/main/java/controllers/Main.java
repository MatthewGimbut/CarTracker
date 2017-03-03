package controllers;
/**
 * Created by Dr. Baliga on 2/11/17.
 * Modified by Michael Moscariello on 2/28/17
 */

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import models.Vehicle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restful.Api;
import models.User;

import java.util.List;

public class Main {
    static Logger logger = LoggerFactory.getLogger(Main.class);
    public static void main(String[] args) {

        get("/hello", (req, res) -> {
            logger.debug("Get request: /hello");
            return "Hello World";
        });

        /**
         * Below uses Httpie to grab all user information in the form of a JSON file
         * Use command http GET http://localhost:4567/users
         */
        get("/users", (req, res) -> {
            //String user = req.params("username");
            logger.info("Get request: /users");
            //        + " for user"
            //        + user);
            Api myapi = Api.getApi();
            List<User> users = myapi.getAllUsers();

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            System.out.println(users.toString());
            return gson.toJson(users);

        });

        /**
        * Below uses Httpie to grab a user's information based on the given username in a JSON file
        * Use command http GET http://localhost:4567/users
        */
        get("/users/:username", ((request, response) -> {
            String username = request.params("Username");
            logger.info("Get request: /users"
                + " for username"
               + username);
            Api myapi = Api.getApi();
            List<User> user = myapi.getUser(username);

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            return gson.toJson(user);
        }));

        /**
        * Below uses Httpie to grab the vehicles associated with the given username in a JSON file
        * Use command http GET http://localhost:4567/cars/:username
        */
        get("/cars/:username", ((request, response) -> {
            String username = request.params("Username");
            logger.info("Get request: /cars"
                    + " for username"
                    + username);
            Api myapi = Api.getApi();
            List<Vehicle> vehicles = myapi.getUserCars(username);

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            return gson.toJson(vehicles);
        }));

        /**
        * Below uses httpie to post the information for a user in the database.  Returns a JSON file with
        * the information
        * Use command http POST http://localhost:4567/users firstName=:firstName lastname=:lastname username=:username
        *                                                  password=:password email=:email age:=:age DOB=:DOB
        */
        post("/users", (request, response) -> {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            response.type("application/json");

            try {
                JsonObject obj = new JsonParser().parse(request.body()).getAsJsonObject();

                String firstName = obj.get("firstName").getAsString();
                String lastName = obj.get("lastName").getAsString();
                String username = obj.get("username").getAsString();
                String password = obj.get("password").getAsString();
                String email = obj.get("email").getAsString();
                int age = obj.get("age").getAsInt();
                String DOB = obj.get("DOB").getAsString();

                Api myapi = Api.getApi();


                if (myapi.createUser(firstName,lastName,username, password, email, age, DOB)) {
                    response.status(200);
                    return gson.toJson(obj);
                }
                else {
                    response.status(400);
                    return(null);
                }

            } catch (Exception e) {
                response.status(404);
                return (gson.toJson(e));
            }

        });

        /**
        * Below uses Httpie to post the vehicle information for a user.  Returns this info as a JSON.
        * Use the command http POST http://localhost:4567/cars/:username make=:make model=:model year:=:year
        *                                                                trim=:trim mileage:=:mileage
        */
        post("/cars/:username", ((request, response) -> {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            response.type("application/json");

            try
            {
                String username = request.params("Username");
                JsonObject obj = new JsonParser().parse(request.body()).getAsJsonObject();

                String make = obj.get("make").getAsString();
                String model = obj.get("model").getAsString();
                int year = obj.get("year").getAsInt();
                String trim = obj.get("trim").getAsString();
                int mileage = obj.get("mileage").getAsInt();

                Api myapi = Api.getApi();

                if (myapi.createVehicle(username, make, model, year, trim, mileage))
                {
                    response.status(200);
                    return gson.toJson(obj);
                }
                else
                {
                    response.status(400);
                    return null;
                }
            }catch(Exception e) {
                 response.status(404);
                 return (gson.toJson(e));
            }
        }));

        /**
         * This method uses Httpie to update the mileage for a user's vehicle.  Returns a JSON containing the information
         * Use command http POST http://localhost:4567/cars/mileage carID:=:carID mileage:=:mileage
         */
        post("/cars/mileage", ((request, response) -> {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            response.type("application/json");

            try {

                //parses and retrieves information after http address in Httpie
                JsonObject obj = new JsonParser().parse(request.body()).getAsJsonObject();
                int carID = obj.get("carID").getAsInt();
                int mileage = obj.get("mileage").getAsInt();

                System.out.println("***********************" +carID + " " + mileage + "*******************************");

                Api myapi = Api.getApi();

                if(myapi.updateMileage(carID, mileage)){
                    response.status(200);
                    return gson.toJson(obj);
                }
                else
                {
                    response.status(400);
                    return null;
                }
            }catch(Exception e) {
                response.status(404);
                return (gson.toJson(e));
            }
        }));

    }
}
