package com.votegaheneta.vote.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVoteTeam is a Querydsl query type for VoteTeam
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVoteTeam extends EntityPathBase<VoteTeam> {

    private static final long serialVersionUID = -671630038L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVoteTeam voteTeam = new QVoteTeam("voteTeam");

    public final ListPath<Candidate, QCandidate> candidates = this.<Candidate, QCandidate>createList("candidates", Candidate.class, QCandidate.class, PathInits.DIRECT2);

    public final StringPath candidateStatement = createString("candidateStatement");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Pledge, QPledge> pledges = this.<Pledge, QPledge>createList("pledges", Pledge.class, QPledge.class, PathInits.DIRECT2);

    public final NumberPath<Integer> pollCnt = createNumber("pollCnt", Integer.class);

    public final StringPath poster = createString("poster");

    public final StringPath prefix = createString("prefix");

    public final com.votegaheneta.stream.entity.QStream stream;

    public final QVote vote;

    public QVoteTeam(String variable) {
        this(VoteTeam.class, forVariable(variable), INITS);
    }

    public QVoteTeam(Path<? extends VoteTeam> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVoteTeam(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVoteTeam(PathMetadata metadata, PathInits inits) {
        this(VoteTeam.class, metadata, inits);
    }

    public QVoteTeam(Class<? extends VoteTeam> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.stream = inits.isInitialized("stream") ? new com.votegaheneta.stream.entity.QStream(forProperty("stream"), inits.get("stream")) : null;
        this.vote = inits.isInitialized("vote") ? new QVote(forProperty("vote"), inits.get("vote")) : null;
    }

}

