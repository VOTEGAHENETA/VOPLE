package com.votegaheneta.chat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSessionChatRoom is a Querydsl query type for SessionChatRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSessionChatRoom extends EntityPathBase<SessionChatRoom> {

    private static final long serialVersionUID = -2004867400L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSessionChatRoom sessionChatRoom = new QSessionChatRoom("sessionChatRoom");

    public final com.votegaheneta.vote.entity.QElectionSession electionSession;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<SessionChat, QSessionChat> sessionChats = this.<SessionChat, QSessionChat>createList("sessionChats", SessionChat.class, QSessionChat.class, PathInits.DIRECT2);

    public QSessionChatRoom(String variable) {
        this(SessionChatRoom.class, forVariable(variable), INITS);
    }

    public QSessionChatRoom(Path<? extends SessionChatRoom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSessionChatRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSessionChatRoom(PathMetadata metadata, PathInits inits) {
        this(SessionChatRoom.class, metadata, inits);
    }

    public QSessionChatRoom(Class<? extends SessionChatRoom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.electionSession = inits.isInitialized("electionSession") ? new com.votegaheneta.vote.entity.QElectionSession(forProperty("electionSession"), inits.get("electionSession")) : null;
    }

}

