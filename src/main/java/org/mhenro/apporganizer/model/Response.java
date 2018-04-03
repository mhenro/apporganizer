package org.mhenro.apporganizer.model;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Created by mhenr on 04.04.2018.
 */
public class Response<T> {
    private T message;

    private Response() {}

    public static <T> ResponseEntity<Response<T>> createResponseEntity(final T message, final HttpStatus httpStatus) {
        Response<T> response = new Response<>();
        response.setMessage(message);
        return new ResponseEntity<>(response, httpStatus);
    }

    public T getMessage() {
        return message;
    }

    public void setMessage(T message) {
        this.message = message;
    }
}
