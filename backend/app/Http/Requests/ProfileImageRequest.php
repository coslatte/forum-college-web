<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:2048', // 2MB
                'dimensions:min_width=100,min_height=100',
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'La imagen es requerida',
            'image.image' => 'El archivo debe ser una imagen',
            'image.mimes' => 'Formatos permitidos: jpeg, png, jpg, gif',
            'image.max' => 'La imagen no puede superar los 2MB',
            'image.dimensions' => 'La imagen debe tener al menos 100x100 píxeles',
        ];
    }
}
