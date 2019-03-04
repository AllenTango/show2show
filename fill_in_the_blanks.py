#!/usr/bin/python
# -*- coding: utf-8 -*-

def choose_level():
    '''提示玩家选择难度，返回难度等级'''
    while True:
        level = raw_input("请选择难度：简单|中等|困难 ")
        levels = ["简单", "中等", "困难"]
        if level not in levels:
            print "请从\"简单、中等、困难\"中选择等级难度，👿"
        else:
            return level

# print choose_level()

def questions():
    '''不同难度等级对应不同问题'''
    easy_question = "《静夜思》 —— 李白 \n 床前明月___1___，疑是地上___2___。 \n 举头望___3___，___4___思故乡。"
    medium_question = "《七步诗》 —— 曹植 \n 煮豆燃___1___，漉豉以为汁。 \n ___2___在釜下燃，豆在釜中___3___。 \n 本是同根生，相煎___4___。"
    hard_question = "《短歌行》节选 —— 曹操 \n 对酒___1___，人生几何？ \n 譬如朝露，去日苦多。 \n 慨当以慷，忧思难忘。 \n 何以解忧，唯有___2___。 \n 青青子衿，___3___我心。 \n 但为君故，___4___至今。"

    user_level = choose_level()
    print "你选择的等级是：" + user_level + " 请作答：🐶"
    print easy_question
    a1 = raw_input("请输入你的答案：___1___")
    a2 = raw_input("请输入你的答案：___2___")
    a3 = raw_input("请输入你的答案：___3___")
    a4 = raw_input("请输入你的答案：___4___")
    n = 0
    if user_level == "简单":
        if a1 == "光" and a2 == "霜" and a3 == "明月" and a4 == "低头":
            print "《静夜思》 —— 李白 \n 床前明月光，疑是地上霜。 \n 举头望明月，低头思故乡。"
        else:
            n += 1
            print "剩余操作次数：" + str(6 - n)
    return "游戏结束，请重新开始"

    if user_level == "中等":
        print medium_question
        while n < 6:
            if a1 == "豆萁":
                print "很好，请继续💪！"
            else:
                n += 1
                print "剩余操作次数：" + str(6 - n)
                if a2 == "萁":
                    print "很好，请继续💪！"
                else:
                    n += 1
                    print "剩余操作次数：" + str(6 - n)
                    if a3 == "豆":
                        print "很好，请继续💪！"
                    else:
                        n += 1
                        print "剩余操作次数：" + str(6 - n)
                        if a4 == "何太急":
                            print "醒目仔！来，睇睇你填完噶诗！" + "\n" + "《七步诗》 —— 曹植 \n 煮豆燃豆萁，漉豉以为汁。 \n 萁在釜下燃，豆在釜中泣。 \n 本是同根生，相煎何太急。"
                        else:
                            n += 1
                            print "剩余操作次数：" + str(6 - n)
        return "游戏结束，请重新开始"

    if user_level == "困难":
        print hard_question
        if a1 == "当歌":
            # print "Well Done "
            if a2 == "杜康":
                # print "Good job!"
                if a3 == "悠悠":
                    # print "继续！"
                    if a4 == "沉吟":
                        # print "来看看你完成的诗！"
                        return "《短歌行》节选 —— 曹操 \n 对酒当歌，人生几何？ \n 譬如朝露，去日苦多。 \n 慨当以慷，忧思难忘。 \n 何以解忧，唯有杜康。 \n 青青子衿，悠悠我心。 \n 但为君故，沉吟至今。"


print questions()

# def play_game():
#     n = 0
#     a1 = raw_input("请输入你的答案：___1___")
#     if a1 == "光":
#         print "Well Done "
#         a2 = raw_input("请输入你的答案：___2___")
#         if a2 == "霜":
#             print "Good job!"
#             a3 = raw_input("请输入你的答案：___3___")
#             if a3 == "明月":
#                 print "继续！"
#                 a4 = raw_input("请输入你的答案：___4___")
#                 if a4 == "举头":
#                     print "来看看你完成的诗！"
#                     print "《静夜思》 —— 李白 \n 床前明月光，疑是地上霜。 \n 举头望明月，低头思故乡。"
#     else:
#         n += 1
#         if n > 3:
#             print "y游戏结束，请重新开始"

# 答案
# print "《短歌行》节选 —— 曹操 \n 对酒当歌，人生几何？ \n 譬如朝露，去日苦多。 \n 慨当以慷，忧思难忘。 \n 何以解忧，唯有杜康。 \n 青青子衿，悠悠我心。 \n 但为君故，沉吟至今。"
# print "《七步诗》 —— 曹植 \n 煮豆燃豆萁，漉豉以为汁。 \n 萁在釜下燃，豆在釜中泣。 \n 本是同根生，相煎何太急。"
# print "《静夜思》 —— 李白 \n 床前明月光，疑是地上霜。 \n 举头望明月，低头思故乡。"
