package org.mhenro.apporganizer.controller;

import org.mhenro.apporganizer.model.Response;
import org.mhenro.apporganizer.model.exception.ObjectNotFoundException;
import org.mhenro.apporganizer.service.ExportService;
import org.mhenro.apporganizer.util.ControllerHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@CrossOrigin
public class ExportController {
    private ExportService exportService;

    @Autowired
    public ExportController(final ExportService exportService) {
        this.exportService = exportService;
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(final HttpServletResponse response) throws IOException {
        exportService.download(response);
    }

    /* ----------------------------------------exception handlers------------------------------------------------ */

    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> ioException(IOException e) {
        return Response.createResponseEntity(ControllerHelper.getErrorOrDefaultMessage(e, "Csv file downloading failed"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
