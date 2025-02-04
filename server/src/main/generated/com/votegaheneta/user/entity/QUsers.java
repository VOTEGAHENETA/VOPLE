package com.votegaheneta.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUsers is a Querydsl query type for Users
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUsers extends EntityPathBase<Users> {

    private static final long serialVersionUID = 1576362212L;

    public static final QUsers users = new QUsers("users");

    public final ListPath<com.votegaheneta.vote.entity.Candidate, com.votegaheneta.vote.entity.QCandidate> candidates = this.<com.votegaheneta.vote.entity.Candidate, com.votegaheneta.vote.entity.QCandidate>createList("candidates", com.votegaheneta.vote.entity.Candidate.class, com.votegaheneta.vote.entity.QCandidate.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath nickname = createString("nickname");

    public final ListPath<com.votegaheneta.vote.entity.Session, com.votegaheneta.vote.entity.QSession> sessions = this.<com.votegaheneta.vote.entity.Session, com.votegaheneta.vote.entity.QSession>createList("sessions", com.votegaheneta.vote.entity.Session.class, com.votegaheneta.vote.entity.QSession.class, PathInits.DIRECT2);

    public final StringPath username = createString("username");

    public final ListPath<com.votegaheneta.vote.entity.VoteInfo, com.votegaheneta.vote.entity.QVoteInfo> voteInfos = this.<com.votegaheneta.vote.entity.VoteInfo, com.votegaheneta.vote.entity.QVoteInfo>createList("voteInfos", com.votegaheneta.vote.entity.VoteInfo.class, com.votegaheneta.vote.entity.QVoteInfo.class, PathInits.DIRECT2);

    public QUsers(String variable) {
        super(Users.class, forVariable(variable));
    }

    public QUsers(Path<? extends Users> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUsers(PathMetadata metadata) {
        super(Users.class, metadata);
    }

}

