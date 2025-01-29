package com.votegaheneta.vote.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCandidate is a Querydsl query type for Candidate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCandidate extends EntityPathBase<Candidate> {

    private static final long serialVersionUID = 967341344L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCandidate candidate = new QCandidate("candidate");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.votegaheneta.user.entity.QUsers user;

    public final QVoteTeam voteTeam;

    public QCandidate(String variable) {
        this(Candidate.class, forVariable(variable), INITS);
    }

    public QCandidate(Path<? extends Candidate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCandidate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCandidate(PathMetadata metadata, PathInits inits) {
        this(Candidate.class, metadata, inits);
    }

    public QCandidate(Class<? extends Candidate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.votegaheneta.user.entity.QUsers(forProperty("user")) : null;
        this.voteTeam = inits.isInitialized("voteTeam") ? new QVoteTeam(forProperty("voteTeam"), inits.get("voteTeam")) : null;
    }

}

