'use client'
import { useState } from "react";
import {
    FaShieldAlt,
    FaCalendarAlt,
    FaUserMd,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaCheckCircle,
    FaArrowRight,
    FaPlay,
    FaStar,
    FaUsers,
    FaAward,
    FaGlobe,
    FaChevronRight,
    FaQuoteLeft
} from "react-icons/fa";

export default function home() {
    const [activeTab, setActiveTab] = useState('children');

    const vaccineCategories = [
        {
            id: 'children',
            name: 'Trẻ em',
            icon: '👶',
            vaccines: ['Uốn ván', 'Bạch hầu', 'Ho gà', 'Polio', 'Sởi', 'Rubella']
        },
        {
            id: 'adults',
            name: 'Người lớn',
            icon: '👨‍⚕️',
            vaccines: ['COVID-19', 'Cúm', 'Viêm gan B', 'HPV', 'Zona', 'Phế cầu']
        },
        {
            id: 'travel',
            name: 'Du lịch',
            icon: '✈️',
            vaccines: ['Sốt vàng', 'Thương hàn', 'Viêm não Nhật Bản', 'Tả', 'Meningitis']
        }
    ];

    const testimonials = [
        {
            name: "Chị Nguyễn Thị Lan",
            role: "Phụ huynh",
            content: "Hệ thống đặt lịch rất tiện lợi, nhân viên tư vấn nhiệt tình. Con tôi được tiêm đúng lịch và an toàn.",
            rating: 5
        },
        {
            name: "Anh Trần Văn Nam",
            role: "Khách hàng",
            content: "Quy trình tiêm chủng chuyên nghiệp, vắc xin chất lượng cao. Tôi rất hài lòng với dịch vụ.",
            rating: 5
        }
    ];

    const stats = [
        { number: "500K+", label: "Khách hàng tin tưởng" },
        { number: "50+", label: "Trung tâm y tế" },
        { number: "200+", label: "Loại vắc xin" },
        { number: "99%", label: "Khách hàng hài lòng" }
    ];

    return (
        <div className="h-full ư-full bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-cyan-600 via-teal-600 to-blue-700 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Hero Content */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                                Bảo vệ sức khỏe với
                                <span className="block text-yellow-300 mt-2">vắc xin chất lượng</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-cyan-100 mb-8 leading-relaxed">
                                Hệ thống tiêm chủng hiện đại, an toàn và tiện lợi. Đặt lịch online,
                                tư vấn miễn phí từ đội ngũ bác sĩ chuyên nghiệp.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    <FaCalendarAlt className="inline mr-2" />
                                    Đặt lịch ngay
                                </button>
                                <button className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                                    <FaPlay className="inline mr-2" />
                                    Xem video giới thiệu
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-cyan-400">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold text-yellow-300">{stat.number}</div>
                                        <div className="text-sm text-cyan-100">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                                <div className="aspect-square bg-gradient-to-br from-white from-opacity-20 to-white to-opacity-5 rounded-2xl flex items-center justify-center">
                                    <FaShieldAlt className="text-8xl sm:text-9xl text-white opacity-80" />
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <div className="absolute -top-4 -right-4 bg-white text-cyan-600 p-4 rounded-xl shadow-lg">
                                <FaCheckCircle className="text-2xl mb-2" />
                                <div className="text-sm font-semibold">An toàn 100%</div>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-cyan-800 p-4 rounded-xl shadow-lg">
                                <FaAward className="text-2xl mb-2" />
                                <div className="text-sm font-semibold">Chứng nhận quốc tế</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Dịch vụ tiêm chủng toàn diện
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Cung cấp đầy đủ các loại vắc xin cho mọi lứa tuổi với quy trình an toàn, hiện đại
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaCalendarAlt className="text-3xl" />,
                                title: "Đặt lịch online",
                                description: "Đặt lịch tiêm chủng dễ dàng qua website hoặc app di động"
                            },
                            {
                                icon: <FaUserMd className="text-3xl" />,
                                title: "Tư vấn chuyên nghiệp",
                                description: "Đội ngũ bác sĩ giàu kinh nghiệm tư vấn miễn phí 24/7"
                            },
                            {
                                icon: <FaShieldAlt className="text-3xl" />,
                                title: "Vắc xin chính hãng",
                                description: "100% vắc xin nhập khẩu từ các hãng dược phẩm uy tín"
                            },
                            {
                                icon: <FaMapMarkerAlt className="text-3xl" />,
                                title: "Mạng lưới rộng khắp",
                                description: "Hơn 50 trung tâm y tế trên toàn quốc, gần nhà bạn"
                            },
                            {
                                icon: <FaUsers className="text-3xl" />,
                                title: "Chăm sóc sau tiêm",
                                description: "Theo dõi và chăm sóc khách hàng sau khi tiêm vắc xin"
                            },
                            {
                                icon: <FaGlobe className="text-3xl" />,
                                title: "Dịch vụ tại nhà",
                                description: "Tiêm chủng tại nhà cho người cao tuổi và trẻ nhỏ"
                            }
                        ].map((service, index) => (
                            <div key={index} className="group bg-gray-50 hover:bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-xl border hover:border-cyan-200">
                                <div className="text-cyan-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vaccine Categories */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Danh mục vắc xin
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Đa dạng các loại vắc xin phù hợp cho từng độ tuổi và mục đích sử dụng
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {vaccineCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === category.id
                                    ? 'bg-cyan-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-cyan-50 hover:text-cyan-600'
                                    }`}
                            >
                                <span className="text-2xl mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        {vaccineCategories.map((category) => (
                            <div key={category.id} className={activeTab === category.id ? 'block' : 'hidden'}>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.vaccines.map((vaccine, index) => (
                                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-cyan-50 transition-colors group cursor-pointer">
                                            <FaCheckCircle className="text-cyan-600 mr-3 group-hover:scale-110 transition-transform" />
                                            <span className="font-medium text-gray-800">{vaccine}</span>
                                            <FaChevronRight className="ml-auto text-gray-400 group-hover:text-cyan-600 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-8">
                                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                                        Xem tất cả vắc xin {category.name.toLowerCase()}
                                        <FaArrowRight className="inline ml-2" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Khách hàng nói gì về chúng tôi
                        </h2>
                        <p className="text-lg text-gray-600">
                            Hàng nghìn khách hàng tin tưởng và hài lòng với dịch vụ
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl relative">
                                <FaQuoteLeft className="text-cyan-600 text-3xl mb-4 opacity-50" />
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    &quot;{testimonial.content}&quot;
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800">{testimonial.name}</div>
                                        <div className="text-gray-600">{testimonial.role}</div>
                                    </div>
                                    <div className="ml-auto flex">
                                        {Array.from({ length: testimonial.rating }, (_, i) => (
                                            <FaStar key={i} className="text-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Sẵn sàng bảo vệ sức khỏe gia đình?
                    </h2>
                    <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
                        Đặt lịch tiêm chủng ngay hôm nay để được tư vấn miễn phí từ đội ngũ chuyên gia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                            <FaCalendarAlt className="inline mr-2" />
                            Đặt lịch ngay
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                            <FaPhone className="inline mr-2" />
                            Gọi tư vấn: 1800 6928
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}