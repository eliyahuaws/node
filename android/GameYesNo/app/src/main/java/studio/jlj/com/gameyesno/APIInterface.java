package studio.jlj.com.gameyesno;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by lior on 10/19/18.
 */

public interface APIInterface {

    @POST("/v1/createUser")
    Call<EntityUser> createUser(@Body EntityUser entityUser);

    @POST("/v1/changeDevice")
    Call<EntityChangeDevice> changeDevice(@Body EntityChangeDevice entityUser);

    @POST("/v1/getAgreemrntIdByDeviceId")
    Call<EntityUser> getAgreemrntIdByDeviceId(@Body EntityUser entityUser);


}
