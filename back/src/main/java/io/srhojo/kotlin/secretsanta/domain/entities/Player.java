package io.srhojo.kotlin.secretsanta.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="PLAYERS")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name="assignated_to")
    private String assignatedTo;

    @Column(name="assignated_date")
    private LocalDateTime assignatedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssignatedTo() {
        return assignatedTo;
    }

    public void setAssignatedTo(String assignatedTo) {
        this.assignatedTo = assignatedTo;
    }

    public LocalDateTime getAssignatedDate() {
        return assignatedDate;
    }

    public void setAssignatedDate(LocalDateTime assignatedDate) {
        this.assignatedDate = assignatedDate;
    }
}

