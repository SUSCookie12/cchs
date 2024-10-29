import pygame

pygame.init()

width, height = 800, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Pong")

paddle_a = pygame.Rect(30, height/2 - 60, 10, 120)
paddle_b = pygame.Rect(width - 40, height/2 - 60, 10, 120)
ball = pygame.Rect(width/2, height/2, 10, 10)
ball_speed_x = 5
ball_speed_y = 5

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_w]:
        paddle_a.y -= 5
    if keys[pygame.K_s]:
        paddle_a.y += 5
    if keys[pygame.K_UP]:
        paddle_b.y -= 5
    if keys[pygame.K_DOWN]:
        paddle_b.y += 5

    ball.x += ball_speed_x
    ball.y += ball_speed_y

    if ball.y < 0 or ball.y > height - 10:
        ball_speed_y *= -1
    if ball.x < 0:
        ball.x = width/2
        ball.y = height/2
        ball_speed_x *= -1
    if ball.x > width - 10:
        ball.x = width/2
        ball.y = height/2
        ball_speed_x *= -1

    if ball.colliderect(paddle_a) or ball.colliderect(paddle_b):
        ball_speed_x *= -1

    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, (255, 255, 255), paddle_a)
    pygame.draw.rect(screen, (255, 255, 255), paddle_b)
    pygame.draw. ellipse(screen, (255, 255, 255), ball)

    pygame.display.flip()
    clock.tick(60)