<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    // public function run(): void
    // {
    //     CommentFactory::new()
    //         ->count(50)
    //         ->create();
    // }
    public function run(): void
    {
        $comments = [];
        $contents = [
            '¡Excelente punto! Estoy totalmente de acuerdo.',
            'Creo que podríamos considerar otro enfoque...',
            'Gracias por compartir esta información.',
            '¿Podrías desarrollar más esa idea?',
            'En mi experiencia, esto funciona mejor de otra manera.',
            'Interesante perspectiva, nunca lo había visto así.',
            '¿Alguien ha probado esto en producción?',
            'Esto resuelve exactamente el problema que tenía.',
            'Hay un error en el tercer punto, debería ser...',
            '¡Qué buen recurso! Justo lo que necesitaba.',
            'Creo que esta solución podría optimizarse.',
            '¿Tienes alguna referencia oficial sobre esto?',
            'Esto funciona perfectamente en mi entorno.',
            'Tuve que hacer algunos ajustes para que funcione.',
            '¿Hay alguna alternativa más sencilla?',
        ];

        // Crear 50 comentarios de ejemplo
        for ($i = 1; $i <= 50; $i++) {
            $comments[] = [
                'content' => $contents[array_rand($contents)],
                'upvotes' => rand(0, 100),
                'downvotes' => rand(0, 30),
                'forum_users_id' => rand(1, 18), // Asume que existen 18 usuarios
                'created_at' => now()->subDays(rand(0, 60)),
                'updated_at' => now(),
            ];
        }

        DB::table('comments')->insert($comments);
    }
}
