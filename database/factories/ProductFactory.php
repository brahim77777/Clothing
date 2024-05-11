<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'category_id' => fake()->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            'description' => fake()->sentence(),
            'main_image' => fake()->imageUrl(),
            'secondary_images' => fake()->imageUrl() . fake()->imageUrl() . fake()->imageUrl(),
            'colors' => fake()->hexColor() . fake()->hexColor() . fake()->hexColor(),
            'sizes' => implode(',', fake()->randomElements(['S', 'M', 'L', 'XL'], fake()->randomElement([1, 2, 3, 4]))),
            'price' => fake()->numberBetween(100, 1000),
            'rating' => fake()->numberBetween(1, 5),
            'quantity' => fake()->numberBetween(1, 100),
            'slug' => fake()->slug(),

        ];
    }
}
