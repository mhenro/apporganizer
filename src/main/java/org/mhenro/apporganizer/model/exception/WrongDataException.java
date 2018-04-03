package org.mhenro.apporganizer.model.exception;

/**
 * Created by mhenr on 04.04.2018.
 */
public class WrongDataException extends RuntimeException {
    public WrongDataException() {
        super();
    }

    public WrongDataException(String message) {
        super(message);
    }
}
