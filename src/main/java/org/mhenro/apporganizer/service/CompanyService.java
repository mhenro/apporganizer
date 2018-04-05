package org.mhenro.apporganizer.service;

import org.mhenro.apporganizer.model.entity.Company;
import org.mhenro.apporganizer.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by mhenr on 05.04.2018.
 */
@Service
@Transactional(readOnly = true)
public class CompanyService {
    private CompanyRepository companyRepository;

    @Autowired
    public CompanyService(final CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
}
