package org.mhenro.apporganizer.repository;

import org.mhenro.apporganizer.model.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by mhenr on 05.04.2018.
 */
public interface CompanyRepository extends JpaRepository<Company, Long> {
}
