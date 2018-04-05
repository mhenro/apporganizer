package org.mhenro.apporganizer.controller;

import org.mhenro.apporganizer.model.Response;
import org.mhenro.apporganizer.repository.CompanyRepository;
import org.mhenro.apporganizer.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by mhenr on 05.04.2018.
 */
@RestController
@CrossOrigin
public class CompanyController {
    private CompanyService companyService;

    @Autowired
    public CompanyController(final CompanyService companyService) {
        this.companyService = companyService;
    }

    @RequestMapping(value = "companies", method = RequestMethod.GET)
    public ResponseEntity<?> getCompanies() {
        return Response.createResponseEntity(companyService.getAllCompanies(), HttpStatus.OK);
    }
}
