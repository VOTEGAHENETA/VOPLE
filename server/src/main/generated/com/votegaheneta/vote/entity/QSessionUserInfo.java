package com.votegaheneta.vote.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSessionUserInfo is a Querydsl query type for SessionUserInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSessionUserInfo extends EntityPathBase<SessionUserInfo> {

    private static final long serialVersionUID = 2086718892L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSessionUserInfo sessionUserInfo = new QSessionUserInfo("sessionUserInfo");

    public final QElectionSession electionSession;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.votegaheneta.user.entity.QUsers user;

    public QSessionUserInfo(String variable) {
        this(SessionUserInfo.class, forVariable(variable), INITS);
    }

    public QSessionUserInfo(Path<? extends SessionUserInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSessionUserInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSessionUserInfo(PathMetadata metadata, PathInits inits) {
        this(SessionUserInfo.class, metadata, inits);
    }

    public QSessionUserInfo(Class<? extends SessionUserInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.electionSession = inits.isInitialized("electionSession") ? new QElectionSession(forProperty("electionSession"), inits.get("electionSession")) : null;
        this.user = inits.isInitialized("user") ? new com.votegaheneta.user.entity.QUsers(forProperty("user")) : null;
    }

}

