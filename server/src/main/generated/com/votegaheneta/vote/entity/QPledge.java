package com.votegaheneta.vote.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPledge is a Querydsl query type for Pledge
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPledge extends EntityPathBase<Pledge> {

    private static final long serialVersionUID = -2128762052L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPledge pledge = new QPledge("pledge");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QVoteTeam voteTeam;

    public QPledge(String variable) {
        this(Pledge.class, forVariable(variable), INITS);
    }

    public QPledge(Path<? extends Pledge> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPledge(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPledge(PathMetadata metadata, PathInits inits) {
        this(Pledge.class, metadata, inits);
    }

    public QPledge(Class<? extends Pledge> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.voteTeam = inits.isInitialized("voteTeam") ? new QVoteTeam(forProperty("voteTeam"), inits.get("voteTeam")) : null;
    }

}

