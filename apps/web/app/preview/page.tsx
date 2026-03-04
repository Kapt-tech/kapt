// 27 unique direct Unsplash photo URLs (sport/marathon/running/race)
const MOSAIC_IMAGES = [
  // Card 1
  "https://images.unsplash.com/photo-1530608132714-0649733475f3?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1486218119243-13301ac4e898?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1524646349956-1590eacfa324?auto=format&fit=crop&q=80&w=300&h=300",
  // Card 2
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1490822180779-2e4769b49de0?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1456227928325-1b59e81e6a0c?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1504025468847-0e438279542c?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=300&h=300",
  // Card 3
  "https://images.unsplash.com/photo-1600439614353-174ad0ee3b25?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1568798350928-d8f8b9ab7a7e?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=300&h=300",
];

export default function AvailableEventsPreview() {
  const cards = [
    {
      title: "Litorânea - São Luís",
      photos: "1.250 Fotos",
      photographers: "3 Fotógrafos",
      avatarUrls: [
        "https://i.pravatar.cc/150?u=photographer1",
        "https://i.pravatar.cc/150?u=photographer2",
        "https://i.pravatar.cc/150?u=photographer3",
      ],
    },
    {
      title: "Maratona de Fortaleza",
      photos: "980 Fotos",
      photographers: "2 Fotógrafos",
      avatarUrls: [
        "https://i.pravatar.cc/150?u=photographer4",
        "https://i.pravatar.cc/150?u=photographer5",
        "https://i.pravatar.cc/150?u=photographer6",
      ],
    },
    {
      title: "Ultra Trail Nordeste",
      photos: "2.340 Fotos",
      photographers: "5 Fotógrafos",
      avatarUrls: [
        "https://i.pravatar.cc/150?u=photographer7",
        "https://i.pravatar.cc/150?u=photographer8",
        "https://i.pravatar.cc/150?u=photographer9",
      ],
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#1A1A1A",
        minHeight: "100vh",
        padding: "48px 40px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "32px",
            fontWeight: "800",
            lineHeight: "1.1",
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
          }}
        >
          Eventos Disponíveis
        </h1>
        <div
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: "#CEFF00",
            marginTop: "10px",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* 3-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        {cards.map((card, cardIndex) => (
          <OccurrenceCard key={cardIndex} card={card} cardIndex={cardIndex} />
        ))}
      </div>
    </div>
  );
}

function OccurrenceCard({
  card,
  cardIndex,
}: {
  card: {
    title: string;
    photos: string;
    photographers: string;
    avatarUrls: string[];
  };
  cardIndex: number;
}) {
  const mosaicImages = MOSAIC_IMAGES.slice(cardIndex * 9, cardIndex * 9 + 9);

  return (
    <div
      style={{
        backgroundColor: "#242424",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #2E2E2E",
      }}
    >
      {/* 3x3 Mosaic */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          backgroundColor: "#1A1A1A",
        }}
      >
        {mosaicImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`Foto ${i + 1}`}
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              display: "block",
            }}
          />
        ))}
      </div>

      {/* Card Content */}
      <div style={{ padding: "20px" }}>
        {/* Title */}
        <h3
          style={{
            color: "#FFFFFF",
            fontWeight: "700",
            fontSize: "18px",
            marginBottom: "6px",
            letterSpacing: "-0.3px",
          }}
        >
          {card.title}
        </h3>

        {/* Stats */}
        <p
          style={{
            color: "#A1A1A1",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          {card.photos}&nbsp;&nbsp;|&nbsp;&nbsp;{card.photographers}
        </p>

        {/* Avatars row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {card.avatarUrls.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={url}
              alt={`Fotógrafo ${i + 1}`}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "2px solid #242424",
                marginLeft: i > 0 ? "-8px" : "0",
                objectFit: "cover",
                display: "block",
                zIndex: 3 - i,
                position: "relative",
              }}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          style={{
            backgroundColor: "#CEFF00",
            color: "#000000",
            fontWeight: "700",
            padding: "12px 0",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            width: "100%",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Ver Fotos
        </button>
      </div>
    </div>
  );
}
