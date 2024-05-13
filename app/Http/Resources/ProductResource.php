<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'category' => $this->category->title,
            'main_image' => $this->main_image,
            'price' => $this->price,
            'rating' => $this->rating,
            'slug' => $this->slug,
            'added_at' => $this->created_at->diffForHumans(),
            'quantity' => $this->quantity,
            'colors' => $this->colors,
            'sizes' => $this->sizes,
        ];
    }
}
