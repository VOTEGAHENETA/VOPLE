package com.votegaheneta.stream.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStream is a Querydsl query type for Stream
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStream extends EntityPathBase<Stream> {

    private static final long serialVersionUID = -460731367L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStream stream = new QStream("stream");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isStreaming = createBoolean("isStreaming");

    public final StringPath streamingUrl = createString("streamingUrl");

    public final com.votegaheneta.vote.entity.QVoteTeam voteTeam;

    public QStream(String variable) {
        this(Stream.class, forVariable(variable), INITS);
    }

    public QStream(Path<? extends Stream> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStream(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStream(PathMetadata metadata, PathInits inits) {
        this(Stream.class, metadata, inits);
    }

    public QStream(Class<? extends Stream> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.voteTeam = inits.isInitialized("voteTeam") ? new com.votegaheneta.vote.entity.QVoteTeam(forProperty("voteTeam"), inits.get("voteTeam")) : null;
    }

}

