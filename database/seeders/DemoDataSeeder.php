<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Carousel;
use App\Models\Destination;
use App\Models\News;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Carousel
        Carousel::create([
            'title' => 'Eksplorasi Kutai Barat',
            'subtitle' => 'Negeri Seribu Mandau',
            'description' => 'Jelajahi kekayaan budaya Dayak dan alam Kalimantan yang masih asri di jantung Borneo.',
            'image' => 'https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=1920',
            'location' => 'Kutai Barat',
            'is_active' => true,
        ]);

        Carousel::create([
            'title' => 'Mahakam yang Megah',
            'subtitle' => 'Nadi Kehidupan Kaltim',
            'description' => 'Susuri sungai terpanjang di Kalimantan dan saksikan kehidupan pesisir yang eksotis.',
            'image' => 'https://images.unsplash.com/photo-1518331822268-6d24de3bc5dd?q=80&w=1920',
            'location' => 'Samarinda - Mahakam',
            'is_active' => true,
        ]);

        // Destinations
        Destination::create([
            'name' => 'Pulau Maratua',
            'slug' => 'pulau-maratua',
            'location' => 'Kepulauan Derawan',
            'category' => 'Pulau',
            'short_description' => 'Maladewa-nya Indonesia dengan resort mewah di atas air dan spot diving kelas dunia.',
            'image' => 'https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=800',
            'is_featured' => true,
            'rating' => 4.9,
            'review_count' => 1250,
        ]);

        Destination::create([
            'name' => 'Bukit Bangkirai',
            'slug' => 'bukit-bangkirai',
            'location' => 'Samboja',
            'category' => 'Hutan',
            'short_description' => 'Sensasi berjalan di jembatan tajuk pohon (Canopy Bridge) di tengah hutan hujan tropis.',
            'image' => 'https://images.unsplash.com/photo-1518331822268-6d24de3bc5dd?q=80&w=800',
            'is_featured' => true,
            'rating' => 4.7,
            'review_count' => 850,
        ]);

        // News
        News::create([
            'title' => 'Pembangunan IKN Dongkrak Kunjungan Wisata Kaltim',
            'slug' => 'pembangunan-ikn-dongkrak-wisata',
            'excerpt' => 'Animo masyarakat mengunjungi kawasan Ibu Kota Nusantara berdampak positif pada okupansi hotel di Balikpapan dan Samarinda.',
            'author' => 'Admin Kaltim',
            'image' => 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600',
            'category' => 'Ekonomi',
            'published_at' => now(),
            'content' => 'Isi berita lengkap mengenai dampak IKN terhadap pariwisata daerah...',
        ]);
    }
}
