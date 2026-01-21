-- schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture_id UUID,  -- Reference to images table
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- IMAGES TABLE
-- ============================================
CREATE TABLE images (
    image_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,  -- Store original name for reference
    file_path VARCHAR(500) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    file_size INTEGER NOT NULL,
    uploaded_by UUID,  -- Track who uploaded it
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key to user
    CONSTRAINT fk_uploaded_by
        FOREIGN KEY (uploaded_by)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- ============================================
-- POSTS TABLE
-- ============================================
CREATE TABLE posts (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    car_make VARCHAR(100) NOT NULL,
    car_model VARCHAR(100) NOT NULL,
    car_year INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_id UUID,  -- Reference to images table instead of direct URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraints
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_post_image
        FOREIGN KEY (image_id)
        REFERENCES images(image_id)
        ON DELETE SET NULL  -- Keep post if image is deleted
);

-- Add foreign key for user profile picture (after images table exists)
ALTER TABLE users
ADD CONSTRAINT fk_profile_picture
    FOREIGN KEY (profile_picture_id)
    REFERENCES images(image_id)
    ON DELETE SET NULL;

-- ============================================
-- LIKES TABLE
-- ============================================
CREATE TABLE likes (
    like_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_like
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_post_like
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id)
        ON DELETE CASCADE,
    
    CONSTRAINT unique_user_post
        UNIQUE (user_id, post_id)
);

-- ============================================
-- COMMENTS TABLE
-- ============================================
CREATE TABLE comments (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_comment
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_post_comment
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id)
        ON DELETE CASCADE
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_images_uploaded_by ON images(uploaded_by);

-- ============================================
-- VIEWS
-- ============================================
CREATE VIEW posts_with_stats AS
SELECT 
    p.*,
    u.username,
    u.profile_picture_id,
    up.file_path as user_profile_picture_path,
    i.file_path as post_image_path,
    i.filename as post_image_filename,
    COUNT(DISTINCT l.like_id) as like_count,
    COUNT(DISTINCT c.comment_id) as comment_count
FROM posts p
LEFT JOIN users u ON p.user_id = u.user_id
LEFT JOIN images up ON u.profile_picture_id = up.image_id
LEFT JOIN images i ON p.image_id = i.image_id
LEFT JOIN likes l ON p.post_id = l.post_id
LEFT JOIN comments c ON p.post_id = c.post_id
GROUP BY p.post_id, u.username, u.profile_picture_id, up.file_path, i.file_path, i.filename;