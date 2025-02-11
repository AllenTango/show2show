# encoding:utf-8

import webbrowser

class Movie():
    # This class provides a way to store movie related information

    def __init__(self, movie_title, movie_storyline, poster_image, trailer_youtube):
        # initialize instance of class Movie
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = poster_image
        self.trailer_youtube_url = trailer_youtube

    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)

class Video(Movie):
    """从Movie中继承属性"""
    def __init__(self, movie_title, movie_storyline, poster_image, trailer_youtube, show_time):
        Movie.__init__(self, movie_title, movie_storyline, poster_image, trailer_youtube)
        self.show_time = show_time

    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
