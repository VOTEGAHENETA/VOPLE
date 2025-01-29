package com.votegaheneta.chat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamChatRoom is a Querydsl query type for TeamChatRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamChatRoom extends EntityPathBase<TeamChatRoom> {

    private static final long serialVersionUID = -849874303L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamChatRoom teamChatRoom = new QTeamChatRoom("teamChatRoom");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<TeamChat, QTeamChat> teamChats = this.<TeamChat, QTeamChat>createList("teamChats", TeamChat.class, QTeamChat.class, PathInits.DIRECT2);

    public final com.votegaheneta.vote.entity.QVoteTeam voteTeam;

    public QTeamChatRoom(String variable) {
        this(TeamChatRoom.class, forVariable(variable), INITS);
    }

    public QTeamChatRoom(Path<? extends TeamChatRoom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamChatRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamChatRoom(PathMetadata metadata, PathInits inits) {
        this(TeamChatRoom.class, metadata, inits);
    }

    public QTeamChatRoom(Class<? extends TeamChatRoom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.voteTeam = inits.isInitialized("voteTeam") ? new com.votegaheneta.vote.entity.QVoteTeam(forProperty("voteTeam"), inits.get("voteTeam")) : null;
    }

}

