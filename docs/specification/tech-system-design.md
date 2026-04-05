---
title: "System Design & Architecture"
description: "Technical specification documenting the system design, container architecture, data models, and key workflows for the Kapt platform."
type: "tech"
epic: "platform"
status: "approved"
related_issues: []
---

# System Design & Architecture

This document outlines the high-level system design and architecture of the Kapt platform, including container interactions, data relationships, and key workflows.

## Container Architecture (C4 Level 2)

The following diagram illustrates the container-level architecture of the Kapt system, showing the main containers and their interactions.

```mermaid
C4Container
    title Container Diagram for Kapt Platform

    Person(seeker, "Seeker", "End user accessing the platform via web/mobile")
    Person(photographer, "Photographer", "Professional photographer uploading event photos")

    Container_Boundary(c1, "Kapt Platform") {
        Container(frontend, "Next.js Frontend", "React/Next.js", "Provides web interface for seekers and photographers")
        Container(backend, "Go Backend", "Go/Gin", "Handles API requests, business logic, and data persistence")
        Container(ai_service, "AI Service", "Python/FastAPI", "Processes photos for identification and analysis")
    }

    Container_Boundary(c2, "External Systems") {
        ContainerDb(postgres, "PostgreSQL Database", "PostgreSQL", "Stores user data, occurrences, photos metadata")
        ContainerDb(s3, "S3 Storage", "AWS S3", "Stores photo files and assets")
    }

    Rel(seeker, frontend, "Uses", "HTTPS")
    Rel(photographer, frontend, "Uploads photos", "HTTPS")
    Rel(frontend, backend, "API calls", "REST/GraphQL")
    Rel(backend, postgres, "Reads/Writes data", "SQL")
    Rel(backend, s3, "Stores/Retrieves files", "HTTPS")
    Rel(backend, ai_service, "Sends photos for processing", "REST")
    Rel(ai_service, backend, "Returns identification results", "REST")
    Rel(ai_service, s3, "Accesses photo files", "HTTPS")
```

## Entity-Relationship Diagram (ERD)

The ERD below shows the key entities and their relationships in the Kapt system.

```mermaid
erDiagram
    occurrence ||--o{ photo : "has"
    occurrence ||--o{ seeker : "attends"
    occurrence ||--o{ photographer : "covers"
    seeker ||--o{ photo : "appears_in"
    photographer ||--o{ photo : "captures"
    photo ||--o{ seeker : "identifies"
    seeker {
        int id PK
        string name
        string email
        string biometric_data
        boolean lgpd_opt_in
        datetime created_at
    }
    occurrence {
        int id PK
        string name
        string description
        datetime event_date
        string location
        int promoter_id FK
    }
    photographer {
        int id PK
        string name
        string email
        string credentials
        datetime created_at
    }
    photo {
        int id PK
        string filename
        string s3_url
        int occurrence_id FK
        int photographer_id FK
        json metadata
        boolean is_kaptured
        datetime uploaded_at
    }
```

## 'Kaptured' Sequence Diagram

The sequence diagram illustrates the data flow from photo upload to 'Zero-Click Discovery' for a registeredSeeker.

```mermaid
sequenceDiagram
    participant P as Photographer
    participant F as Next.js Frontend
    participant B as Go Backend
    participant AI as AI Service
    participant DB as PostgreSQL
    participant S3 as S3 Storage
    participant S as Seeker

    P->>F: Upload photo file
    F->>B: POST /api/photos/upload
    B->>S3: Store photo file
    S3-->>B: File URL
    B->>DB: Insert photo metadata
    DB-->>B: Photo ID
    B->>AI: Send photo for processing
    AI->>S3: Retrieve photo file
    S3-->>AI: Photo data
    AI->>AI: Analyze & identify seeker
    AI-->>B: Identification results
    B->>DB: Update photo with Kaptured status
    DB-->>B: Confirmation

    Note over B: Photo is now 'Kaptured'

    S->>F: Login as registeredSeeker
    F->>B: GET /api/seeker/photos
    B->>DB: Query Kaptured photos for seeker
    DB-->>B: Photo list
    B-->>F: Return photo data
    F-->>S: Display private gallery
```

## Component Responsibilities

### Next.js Frontend
- **Responsibility**: Provides the web interface for seekers and photographers, handling user interactions and displaying data.
- **Backend Integration**: Communicates with the Go Backend via REST/GraphQL APIs for data retrieval and submission.
- **Data Persistence**: Does not handle data persistence directly; relies on backend for all database operations.

### Go Backend
- **Responsibility**: Implements business logic, API endpoints, and orchestrates interactions between services.
- **Backend Integration**: Serves as the central hub, integrating with PostgreSQL for data operations, S3 for file storage, and AI Service for photo processing.
- **Data Persistence**: Manages all CRUD operations on PostgreSQL, ensuring data consistency and enforcing business rules.

### PostgreSQL Database
- **Responsibility**: Stores structured data including user profiles, occurrences, photos metadata, and relationships.
- **Backend Integration**: Connected to Go Backend via SQL queries generated by sqlc.
- **Data Persistence**: Primary data store, ensuring ACID compliance and referential integrity.

### S3 Storage
- **Responsibility**: Stores photo files and other assets in a scalable, durable object storage system.
- **Backend Integration**: Accessed by Go Backend for file uploads/downloads and by AI Service for photo analysis.
- **Data Persistence**: Provides long-term storage with high availability and low latency access.

### AI Service
- **Responsibility**: Processes uploaded photos to identify seekers using biometric data and machine learning algorithms.
- **Backend Integration**: Receives photo processing requests from Go Backend and returns identification results.
- **Data Persistence**: Does not persist data directly; relies on backend for storing processed results in PostgreSQL.