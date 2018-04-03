package org.mhenro.apporganizer.model.exception;

/**
 * Created by mhenr on 04.04.2018.
 */
public class ObjectNotFoundException extends RuntimeException {
    public ObjectNotFoundException() {
        super();
    }

    public ObjectNotFoundException(String message) {
        super(message);
    }
}
