package org.mhenro.apporganizer.util;

/**
 * Created by mhenr on 04.04.2018.
 */
public final class ControllerHelper {
    private ControllerHelper() {}

    public static String getErrorOrDefaultMessage(final Exception e, final String defaultMessage) {
        if (e != null && e.getMessage() != null) {
            return e.getMessage();
        }
        return defaultMessage;
    }
}
