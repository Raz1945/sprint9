PGDMP         0                {            db_tasks    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    32895    db_tasks    DATABASE     {   CREATE DATABASE db_tasks WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE db_tasks;
                postgres    false            �            1259    32930 	   prioridad    TABLE     �   CREATE TABLE public.prioridad (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(150)
);
    DROP TABLE public.prioridad;
       public         heap    postgres    false            �            1259    32929    prioridad_id_seq    SEQUENCE     �   CREATE SEQUENCE public.prioridad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.prioridad_id_seq;
       public          postgres    false    217                       0    0    prioridad_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.prioridad_id_seq OWNED BY public.prioridad.id;
          public          postgres    false    216            �            1259    32937    tarea    TABLE     �   CREATE TABLE public.tarea (
    id integer NOT NULL,
    titulo character varying(250) NOT NULL,
    completado boolean DEFAULT false NOT NULL,
    usuario_id integer NOT NULL,
    prioridad_id integer NOT NULL
);
    DROP TABLE public.tarea;
       public         heap    postgres    false            �            1259    32936    tarea_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tarea_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tarea_id_seq;
       public          postgres    false    219                       0    0    tarea_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tarea_id_seq OWNED BY public.tarea.id;
          public          postgres    false    218            �            1259    32920    usuario    TABLE     �   CREATE TABLE public.usuario (
    id integer NOT NULL,
    email character varying(150) NOT NULL,
    activo boolean DEFAULT true NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    32919    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    215                       0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    214            q           2604    32933    prioridad id    DEFAULT     l   ALTER TABLE ONLY public.prioridad ALTER COLUMN id SET DEFAULT nextval('public.prioridad_id_seq'::regclass);
 ;   ALTER TABLE public.prioridad ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            r           2604    32940    tarea id    DEFAULT     d   ALTER TABLE ONLY public.tarea ALTER COLUMN id SET DEFAULT nextval('public.tarea_id_seq'::regclass);
 7   ALTER TABLE public.tarea ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            o           2604    32923 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215                      0    32930 	   prioridad 
   TABLE DATA           <   COPY public.prioridad (id, nombre, descripcion) FROM stdin;
    public          postgres    false    217   >                 0    32937    tarea 
   TABLE DATA           Q   COPY public.tarea (id, titulo, completado, usuario_id, prioridad_id) FROM stdin;
    public          postgres    false    219   �                 0    32920    usuario 
   TABLE DATA           4   COPY public.usuario (id, email, activo) FROM stdin;
    public          postgres    false    215   F                  0    0    prioridad_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.prioridad_id_seq', 6, true);
          public          postgres    false    216                       0    0    tarea_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tarea_id_seq', 9, true);
          public          postgres    false    218                       0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 4, true);
          public          postgres    false    214            y           2606    32935    prioridad prioridad_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.prioridad
    ADD CONSTRAINT prioridad_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.prioridad DROP CONSTRAINT prioridad_pkey;
       public            postgres    false    217            {           2606    32943    tarea tarea_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tarea
    ADD CONSTRAINT tarea_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tarea DROP CONSTRAINT tarea_pkey;
       public            postgres    false    219            u           2606    32928    usuario uq_email 
   CONSTRAINT     L   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_email UNIQUE (email);
 :   ALTER TABLE ONLY public.usuario DROP CONSTRAINT uq_email;
       public            postgres    false    215            w           2606    32926    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    215            |           2606    32949    tarea prioridad_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tarea
    ADD CONSTRAINT prioridad_id FOREIGN KEY (prioridad_id) REFERENCES public.prioridad(id) NOT VALID;
 <   ALTER TABLE ONLY public.tarea DROP CONSTRAINT prioridad_id;
       public          postgres    false    3193    219    217            }           2606    32944    tarea usuario_id    FK CONSTRAINT     ~   ALTER TABLE ONLY public.tarea
    ADD CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) NOT VALID;
 :   ALTER TABLE ONLY public.tarea DROP CONSTRAINT usuario_id;
       public          postgres    false    219    215    3191               S   x�3�tJ�J�I,JM,VH��S((��/�LILQHIU(�S��,K�Q ���2��MM�$B5HY>�1�cN	վ����\1z\\\ �j+�         �   x�e�1�0�W�H�$%�	 *,%�uqx?HPP�47�u�GRjvES��E����8�7]�p��q�_����68��c�=�2_K$5�7�\��a�XA�j�C�a"��k�F}��9��g�I�'7u�4��\�N;9.D�	H�;         <   x�3�L��+N�sH�M���K���,�2�LKMIJ-B4�L+K-J�A4�LI������ 1r     