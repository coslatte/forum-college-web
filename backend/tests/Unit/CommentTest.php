<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Comment;
use Carbon\Carbon;

class CommentTest extends TestCase
{
    public function testGetCommentDateReturnsFormattedDate()
    {
        $comment = new Comment();
        $comment->created_at = Carbon::create(2023, 1, 15, 10, 30, 0);

        $expected = '2023-01-15 10:30:00';
        $this->assertEquals($expected, $comment->getCommentDate());
    }

    public function testGetCommentDateReturnsFormattedDateWithCustomFormat()
    {
        $comment = new Comment();
        $comment->created_at = Carbon::create(2023, 1, 15, 10, 30, 0);

        $expected = '15-01-2023';
        $this->assertEquals($expected, $comment->getCommentDate('d-m-Y'));
    }

    public function testGetCommentDateReturnsNullIfCreatedAtIsNull()
    {
        $comment = new Comment();
        $comment->created_at = null;

        $this->assertNull($comment->getCommentDate());
    }
}
