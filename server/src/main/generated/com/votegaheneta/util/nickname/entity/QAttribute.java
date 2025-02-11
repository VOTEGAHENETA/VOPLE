package com.votegaheneta.util.nickname.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAttribute is a Querydsl query type for Attribute
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAttribute extends EntityPathBase<Attribute> {

    private static final long serialVersionUID = 689559489L;

    public static final QAttribute attribute = new QAttribute("attribute");

    public final StringPath describing = createString("describing");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QAttribute(String variable) {
        super(Attribute.class, forVariable(variable));
    }

    public QAttribute(Path<? extends Attribute> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAttribute(PathMetadata metadata) {
        super(Attribute.class, metadata);
    }

}

