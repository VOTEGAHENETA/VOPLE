package com.votegaheneta.vote.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSession is a Querydsl query type for Session
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSession extends EntityPathBase<Session> {

    private static final long serialVersionUID = 908371315L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSession session = new QSession("session");

    public final StringPath entranceAnswer = createString("entranceAnswer");

    public final StringPath entranceQuestion = createString("entranceQuestion");

    public final com.votegaheneta.user.entity.QUsers hostUser;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath qrCode = createString("qrCode");

    public final StringPath sessionName = createString("sessionName");

    public final DateTimePath<java.time.LocalDateTime> sessionStartTime = createDateTime("sessionStartTime", java.time.LocalDateTime.class);

    public final NumberPath<Integer> votedVoter = createNumber("votedVoter", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> voteEndTime = createDateTime("voteEndTime", java.time.LocalDateTime.class);

    public final ListPath<Vote, QVote> votes = this.<Vote, QVote>createList("votes", Vote.class, QVote.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> voteStartTime = createDateTime("voteStartTime", java.time.LocalDateTime.class);

    public final NumberPath<Integer> wholeVoter = createNumber("wholeVoter", Integer.class);

    public QSession(String variable) {
        this(Session.class, forVariable(variable), INITS);
    }

    public QSession(Path<? extends Session> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSession(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSession(PathMetadata metadata, PathInits inits) {
        this(Session.class, metadata, inits);
    }

    public QSession(Class<? extends Session> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.hostUser = inits.isInitialized("hostUser") ? new com.votegaheneta.user.entity.QUsers(forProperty("hostUser")) : null;
    }

}

