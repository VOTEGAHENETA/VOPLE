package com.votegaheneta.chat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSessionChat is a Querydsl query type for SessionChat
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSessionChat extends EntityPathBase<SessionChat> {

    private static final long serialVersionUID = 327784509L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSessionChat sessionChat = new QSessionChat("sessionChat");

    public final TimePath<java.time.LocalTime> createdTime = createTime("createdTime", java.time.LocalTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QSessionChatRoom sessionChatRoom;

    public final StringPath text = createString("text");

    public final com.votegaheneta.user.entity.QUsers user;

    public QSessionChat(String variable) {
        this(SessionChat.class, forVariable(variable), INITS);
    }

    public QSessionChat(Path<? extends SessionChat> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSessionChat(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSessionChat(PathMetadata metadata, PathInits inits) {
        this(SessionChat.class, metadata, inits);
    }

    public QSessionChat(Class<? extends SessionChat> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.sessionChatRoom = inits.isInitialized("sessionChatRoom") ? new QSessionChatRoom(forProperty("sessionChatRoom"), inits.get("sessionChatRoom")) : null;
        this.user = inits.isInitialized("user") ? new com.votegaheneta.user.entity.QUsers(forProperty("user")) : null;
    }

}

