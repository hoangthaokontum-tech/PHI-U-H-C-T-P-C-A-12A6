const LESSON_DATA = {
    subject: "Hóa học",
    grade: "12",
    textbook: "Kết nối tri thức",
    title: "HỒ SƠ ĐIỆP VIÊN: GIẢI MÃ BĂNG ĐẢNG AMINE",
    subtitle: "Học mà chơi • Tương tác • Tự kiểm tra • Tự động tính điểm",
    goals: [
        "Lật tẩy chân tướng băng đảng Amine ẩn nấp trong bài học.",
        "Hiểu được nguồn gốc, cấu trúc, và bậc của Amine.",
        "Nhận dạng nhanh các đặc điểm vật lý cơ bản của chúng."
    ],
    sections: [
        {
            type: "fill",
            title: "🔍 VÒNG 1: GIẢI MÃ TÀI LIỆU MẬT (Điền từ)",
            description: "Nhặt các từ khóa rớt tại hiện trường để điền: amine, bậc, ammonia (NH3), hydrocarbon, nitrogen (N), cá ươn.",
            questions: [
                { id: "v1_1", prefix: "Băng đảng Amine thực chất được thành lập khi người ta bắt cóc các nguyên tử hydrogen của người mẹ", suffix: "", answers: ["ammonia", "nh3", "ammonia (nh3)"] },
                { id: "v1_2", prefix: "và thay thế bằng các tay sai mang tên gốc", suffix: ".", answers: ["hydrocarbon"] },
                { id: "v1_3", prefix: "Để xếp hạng mức độ nguy hiểm, độ ngầu (hay còn gọi là", suffix: ") của một tên amine", answers: ["bậc"] },
                { id: "v1_4", prefix: "sẽ được tính bằng đúng số lượng gốc hydrocarbon bám trực tiếp vào ông trùm", suffix: ".", answers: ["nitrogen", "n", "nitrogen (n)"] },
                { id: "v1_5", prefix: "Khi ra đường, chúng đều dùng chung một đuôi tên họ là", suffix: ".", answers: ["amine"] },
                { id: "v1_6", prefix: "Bọn đàn em nhỏ con (amine bậc thấp) thường lượn lờ ở thể khí, bơi lội cực giỏi trong nước nhưng lại xài loại nước hoa có mùi", suffix: "vô cùng ám ảnh!", answers: ["cá ươn"] }
            ]
        },
        {
            type: "truefalse",
            title: "🚨 VÒNG 2: MÁY PHÁT HIỆN NÓI DỐI (Đúng / Sai)",
            questions: [
                { id: "v2_1", text: "Nghi phạm Nitrogen khai: 'Oan quá, trên người tôi vẫn còn cất giấu 1 cặp electron tự do chưa thèm liên kết với ai đâu!'", answer: "Đúng" },
                { id: "v2_2", text: "Nghi phạm CH₃−NH−CH₃ cãi: 'Nhìn mặt tôi hiền thế này, tôi chắc chắn là amine bậc 1, một đứa con ngoan!'", answer: "Sai" },
                { id: "v2_3", text: "Băng Amine đồng thanh: 'Tụi này không biết phân thân đâu, không hề có đồng phân mạch carbon hay đồng phân vị trí gì sất!'", answer: "Sai" },
                { id: "v2_4", text: "Trùm cuối Aniline (C₆H₅NH₂) đe dọa: 'Ta ở thể lỏng, ghét tắm (ít tan trong nước) nhưng nếu ai đụng vào ta thì cẩn thận vì ta CỰC KỲ ĐỘC!'", answer: "Đúng" }
            ]
        },
        {
            type: "mcq",
            title: "🎯 VÒNG 3: TRUY TÌM BẰNG CHỨNG (Trắc nghiệm)",
            questions: [
                {
                    id: "v3_1",
                    question: "Câu 1: Lính bắn tỉa báo cáo phát hiện một tên 'Amine bậc 1' đang lẩn trốn. Đặc điểm nhận dạng của hắn là cái đuôi nào?",
                    options: ["Có nhóm −NH− kẹp giữa.", "Có cái đuôi −NH₂ vểnh ra.", "Có chữ N đứng trơ trọi một mình.", "Là khối NH₃ to đùng."],
                    answer: "Có cái đuôi −NH₂ vểnh ra."
                },
                {
                    id: "v3_2",
                    question: "Câu 2: Khám xét chứng minh thư, kẻ có hình xăm CH₃−NH₂ đăng ký tên hợp pháp là gì?",
                    options: ["Trà sữa trân châu", "Ethylamine", "Methylamine", "Aniline"],
                    answer: "Methylamine"
                },
                {
                    id: "v3_3",
                    question: "Câu 3: Bằng chứng nào sau đây là LỜI KHAI GIẢ mạo khi miêu tả về bọn amine 'lưng chừng' (bậc thấp)?",
                    options: ["Ở điều kiện thường chúng là chất khí bay lơ lửng.", "Thích bơi lội (Tan rất tốt trong nước).", "Có mùi cá ươn đặc trưng của băng đảng.", "Xịt nước hoa thơm lừng mùi hoa hồng."],
                    answer: "Xịt nước hoa thơm lừng mùi hoa hồng."
                }
            ]
        },
        {
            type: "fill",
            title: "⏱️ VÒNG 4: HỎI CUNG THẦN TỐC (Trả lời ngắn)",
            questions: [
                { id: "v4_1", prefix: "Câu 1: Khám xét tận túi của nguyên tử Nitrogen (N), ta phát hiện hắn còn giấu bao nhiêu 'cặp electron' đang ngồi chơi xơi nước?", suffix: "cặp.", answers: ["1", "một"] },
                { id: "v4_2", prefix: "Câu 2: Nếu lính mới vô tình để dung dịch Aniline (C₆H₅NH₂) đổ ra tay, có nguy cơ trúng độc không? (Trả lời: Có hay Không)", suffix: "", answers: ["có", "co"] },
                { id: "v4_3", prefix: "Câu 3: Phác họa nhanh công thức hóa học của tên Methylamine:", suffix: "", answers: ["ch3nh2", "ch3-nh2", "ch3 nh2", "ch₃nh₂"] }
            ]
        },
        {
            type: "dragdrop",
            title: "🧩 VÒNG 5: NHẬN DIỆN MỤC TIÊU (Kéo thả thẻ kiến thức)",
            cards: [
                { id: "item1", label: "CH₃NH₂" },
                { id: "item2", label: "CH₃-NH-CH₃" },
                { id: "item3", label: "(CH₃)₃N" }
            ],
            targets: [
                { accept: "item1", text: "📌 Nơi giam giữ Amine bậc 1" },
                { accept: "item2", text: "📌 Nơi giam giữ Amine bậc 2" },
                { accept: "item3", text: "📌 Nơi giam giữ Amine bậc 3" }
            ]
        }
    ],
    remember: [
        "Amine được tạo thành khi thay thế nguyên tử H trong phân tử NH₃ bằng gốc hydrocarbon.",
        "Bậc của amine được tính bằng số gốc hydrocarbon liên kết trực tiếp với nguyên tử N.",
        "Các amine bậc thấp (như methylamine) thường là chất khí, tan nhiều trong nước, có mùi khai hoặc cá ươn.",
        "Aniline (C₆H₅NH₂) ở điều kiện thường là chất lỏng, ít tan trong nước và rất độc.",
        "Nguyên tử Nitrogen (N) trong phân tử amine vẫn còn 1 cặp electron tự do chưa liên kết."
    ]
};
