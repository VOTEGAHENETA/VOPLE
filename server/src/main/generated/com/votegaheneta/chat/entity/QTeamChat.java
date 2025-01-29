package com.votegaheneta.chat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamChat is a Querydsl query type for TeamChat
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamChat extends EntityPathBase<TeamChat> {

    private static final long serialVersionUID = 698921094L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamChat teamChat = new QTeamChat("teamChat");

    public final TimePath<java.time.LocalTime> createdTime = createTime("createdTime", java.time.LocalTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QTeamChatRoom teamChatRoom;

    public final StringPath text = createString("text");

    public final com.votegaheneta.user.entity.QUsers user;

    public QTeamChat(String variable) {
        this(TeamChat.class, forVariable(variable), INITS);
    }

    public QTeamChat(Path<? extends TeamChat> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamChat(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamChat(PathMetadata metadata, PathInits inits) {
        this(TeamChat.class, metadata, inits);
    }

    public QTeamChat(Class<? extends TeamChat> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teamChatRoom = inits.isInitialized("teamChatRoom") ? new QTeamChatRoom(forProperty("teamChatRoom"), inits.get("teamChatRoom")) : null;
        this.user = inits.isInitialized("user") ? new com.votegaheneta.user.entity.QUsers(forProperty("user")) : null;
    }

}

