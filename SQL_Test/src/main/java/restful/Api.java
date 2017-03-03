package restful;


import models.User;
import models.Vehicle;

import java.util.List;

/**
 * Copyright Dr. Ganesh R. Baliga
 * All rights reserved.
 * Modified by Michael Moscariello on 2/28/17
 */

public abstract class Api {

    static Api theApi = null;

    public static Api getApi() {
        if (theApi == null)
            theApi = new ApiImplementation();
        return theApi;
    }

    public abstract List<User> getUser(String username);

    public abstract List<User> getAllUsers();

    public abstract List<Vehicle> getUserCars(String username);

    public abstract boolean createUser (
            String firstName,
            String lastName,
            String username,
            String password,
            String email,
            int age,
            String DOB
    );

    public abstract boolean createVehicle(
            String username,
            String make,
            String model,
            int year,
            String trim,
            int mileage
    );

    public abstract boolean updateMileage(
            int carID,
            int mileage
    );

}