<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Comment;
use Carbon\Carbon;

class CommentDateTimeTest extends TestCase
{
    public function testGetCommentDateReturnsFormattedDate()
    {
        $comment = new Comment();
        $comment->created_at = Carbon::create(2024, 6, 10, 14, 30, 0);

        $this->assertEquals('2024-06-10', $comment->getCommentDate());
        $this->assertEquals('10/06/2024', $comment->getCommentDate('d/m/Y'));
    }

    public function testGetCommentDateReturnsNullIfCreatedAtIsNull()
    {
        $comment = new Comment();
        $comment->created_at = null;

        $this->assertNull($comment->getCommentDate());
    }

    public function testGetCommentHourReturnsFormattedTime()
    {
        $comment = new Comment();
        $comment->created_at = Carbon::create(2024, 6, 10, 14, 30, 0);

        $this->assertEquals('14:30:00', $comment->getCommentHour());
        $this->assertEquals('02:30 PM', $comment->getCommentHour('h:i A'));
    }

    public function testGetCommentHourReturnsNullIfCreatedAtIsNull()
    {
        $comment = new Comment();
        $comment->created_at = null;

        $this->assertNull($comment->getCommentHour());
    }
}
