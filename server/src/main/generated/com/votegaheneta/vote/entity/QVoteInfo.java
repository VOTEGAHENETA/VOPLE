package com.votegaheneta.vote.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVoteInfo is a Querydsl query type for VoteInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVoteInfo extends EntityPathBase<VoteInfo> {

    private static final long serialVersionUID = -671948933L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVoteInfo voteInfo = new QVoteInfo("voteInfo");

    public final BooleanPath hasSelect = createBoolean("hasSelect");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath selectCandidate = createString("selectCandidate");

    public final com.votegaheneta.user.entity.QUsers user;

    public final EnumPath<com.votegaheneta.user.enums.USER_TYPE> userType = createEnum("userType", com.votegaheneta.user.enums.USER_TYPE.class);

    public final QVote vote;

    public QVoteInfo(String variable) {
        this(VoteInfo.class, forVariable(variable), INITS);
    }

    public QVoteInfo(Path<? extends VoteInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVoteInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVoteInfo(PathMetadata metadata, PathInits inits) {
        this(VoteInfo.class, metadata, inits);
    }

    public QVoteInfo(Class<? extends VoteInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.votegaheneta.user.entity.QUsers(forProperty("user")) : null;
        this.vote = inits.isInitialized("vote") ? new QVote(forProperty("vote"), inits.get("vote")) : null;
    }

}

